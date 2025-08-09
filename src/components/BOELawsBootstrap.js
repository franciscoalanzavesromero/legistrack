"use client"

import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
  Spinner,
} from "react-bootstrap"
import { Calendar, FileText, Filter, Search, Eye, Download } from "lucide-react"

const lawTypes = ["Todos", "Ley", "Real Decreto", "Real Decreto-ley", "Orden", "Resolución"]
const statusOptions = ["Todos", "Vigente", "Derogado", "En tramitación"]

const ITEMS_PER_PAGE = 5
const MAX_PAGE_BUTTONS = 5

const API_BASE_URL = "https://boe-xn8q.onrender.com/api"

export default function BOELawsBootstrap() {
  const [laws, setLaws] = useState([])
  const [filteredLaws, setFilteredLaws] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("Todos")
  const [selectedStatus, setSelectedStatus] = useState("Todos")
  const [selectedAmbito, setSelectedAmbito] = useState("Todos")
  const [ambitos, setAmbitos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/normas`)
        const data = await response.json()

        // Filtrar normas con control no nulo
        const filteredData = data.filter((law) => law.control != null)

        // Obtener ámbitos en paralelo
        const ambitoPromises = filteredData.map(async (law) => {
          if (law.ambitoId) {
            const ambitoRes = await fetch(`${API_BASE_URL}/ambitos/${law.ambitoId}`)
            if (ambitoRes.ok) {
              const ambitoData = await ambitoRes.json()
              return ambitoData.nombre || "Ámbito desconocido"
            }
          }
          return "Ámbito desconocido"
        })

        const ambitosData = await Promise.all(ambitoPromises)

        const transformed = filteredData.map((law, index) => ({
          id: law.id,
          identificador: law.identificador,
          title: law.titulo,
          date: law.fechaPublicacion,
          type: inferTypeFromTitle(law.titulo),
          ministry: "Ministerio desconocido",
          summary: extractSummary(law.texto),
          status: inferStatus(law),
          pages:
            law.paginaFinal && law.paginaInicial
              ? law.paginaFinal - law.paginaInicial + 1
              : 0,
          urlPdf: law.urlPdf,
          urlHtml: law.urlHtml,
          ambito: ambitosData[index],
        }))

        setLaws(transformed)
        setFilteredLaws(transformed)

        // Extraer ámbitos únicos para el filtro
        const uniqueAmbitos = Array.from(new Set(transformed.map((law) => law.ambito))).sort()
        setAmbitos(["Todos", ...uniqueAmbitos])
      } catch (error) {
        console.error("Error al cargar normas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLaws()
  }, [])

  function inferTypeFromTitle(title) {
    if (!title) return "Ley"
    if (title.toLowerCase().includes("real decreto-ley")) return "Real Decreto-ley"
    if (title.toLowerCase().includes("real decreto")) return "Real Decreto"
    if (title.toLowerCase().includes("orden")) return "Orden"
    if (title.toLowerCase().includes("resolución")) return "Resolución"
    if (title.toLowerCase().includes("ley")) return "Ley"
    return "Ley"
  }

  function extractSummary(htmlText) {
    if (!htmlText) return ""
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = htmlText
    return tempDiv.textContent.substring(0, 200) + "..."
  }

  function inferStatus(law) {
    return "Vigente"
  }

  const handleSearch = () => {
    let filtered = [...laws]

    if (searchTerm) {
      filtered = filtered.filter(
        (law) =>
          law.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          law.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          law.ministry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          law.ambito?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== "Todos") {
      filtered = filtered.filter((law) => law.type === selectedType)
    }

    if (selectedStatus !== "Todos") {
      filtered = filtered.filter((law) => law.status === selectedStatus)
    }

    if (selectedAmbito !== "Todos") {
      filtered = filtered.filter((law) => law.ambito === selectedAmbito)
    }

    setFilteredLaws(filtered)
    setCurrentPage(1) // Resetear página al buscar
  }

  // Paginación
  const totalPages = Math.ceil(filteredLaws.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentLaws = filteredLaws.slice(startIndex, endIndex)

  function getPageNumbers(current, total, maxButtons) {
    let start = Math.max(1, current - Math.floor(maxButtons / 2))
    let end = start + maxButtons - 1

    if (end > total) {
      end = total
      start = Math.max(1, end - maxButtons + 1)
    }

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages, MAX_PAGE_BUTTONS)

  return (
    <div className="bg-light py-4">
      <Container>
        <Card className="mb-4">
          <Card.Header className="d-flex align-items-center">
            <Filter className="me-2" /> Búsqueda y filtros
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Buscar por título, resumen, ministerio o ámbito"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                  {lawTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select value={selectedAmbito} onChange={(e) => setSelectedAmbito(e.target.value)}>
                  {ambitos.map((ambito) => (
                    <option key={ambito}>{ambito}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col md={2} className="d-grid">
                <Button variant="primary" onClick={handleSearch}>
                  <Search size={16} className="me-1" /> Buscar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {loading && (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {!loading && currentLaws.length === 0 && (
          <p className="text-center text-muted">No se encontraron normas.</p>
        )}

        {!loading &&
          currentLaws.length > 0 &&
          currentLaws.map((law) => (
            <Card key={law.id} className="mb-3">
              <Card.Header>
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    {law.type && <Badge bg="info">{law.type}</Badge>}
                    {law.status && <Badge bg="success">{law.status}</Badge>}
                    {law.identificador && <span className="text-muted small">{law.identificador}</span>}
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Card.Title>{law.title || ""}</Card.Title>
                <Card.Text>{law.summary || ""}</Card.Text>
                <Row className="mb-3">
                  <Col md={4} className="text-muted">
                    <Calendar size={16} className="me-1" />
                    {law.date
                      ? new Date(law.date).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </Col>
                  <Col md={4} className="text-muted">
                    <FileText size={16} className="me-1" /> {law.pages || ""}
                  </Col>
                  <Col md={4} className="text-muted">
                    <strong>Ámbito:</strong> {law.ambito || law.ministry || ""}
                  </Col>
                </Row>
                <div className="d-flex gap-2">
                  {law.urlHtml && (
                    <Button variant="primary" size="sm" onClick={() => window.open(law.urlHtml, "_blank")}>
                      <Eye size={14} className="me-1" /> Ver texto completo
                    </Button>
                  )}
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => window.open(law.urlPdf, "_blank")}
                    disabled={!law.urlPdf}
                  >
                    <Download size={14} className="me-1" /> Descargar PDF
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}

        {/* Paginación */}
        <div className="mt-4 d-flex justify-content-center gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Anterior
          </Button>

          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "primary" : "outline-secondary"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline-secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Siguiente
          </Button>
        </div>
      </Container>
    </div>
  )
}
